from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from modules.monte_carlo.portfolio_sim import PortfolioSim
from planning_tool.serializers import *
from utils.serializers import *
from django.db import transaction
from django.utils.timezone import now
import threading
import datetime


class Classifier_API(APIView):
    """
    Facilitates data transfer from the Classifier class

    Attributes:
        classifier (Classifier): The classifier algorithm object
        request_data (dictionary {string: string}): A dictionary of the expense form (key),
            and it's budget category (value)

    """

    def __init__(self):
        """
        Initializes the Classifier_API object
        """
        pass

    def get(self, request, key):
        """
        Gets the results of the classifier algorthm

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            key (string): The text entered into the expense form of the budgeting tool

        Returns:
            Response: results of the classifier in JSON format
        """
        pass

    def __update_category(self, key):
        """
        Updates the category of the classifier entry

        Arguments:
            key (string): The text entered into the expense form of the budgeting tool

        Returns:
            boolean: confirmation if the update to the category was successful
        """
        pass


class Cluster_API(APIView):
    """
    Facilitates data transfer from the Cluster class

    Attributes:
        cluster (Cluster): The cluster algorithm object
        request_data (dictionary {string: int}): A dictionary of the User's name (key),
            and their risk category (value)
    """

    def __init__(self):
        """
        Initializes the Cluster_API object
        """
        pass

    def get(self, request, key):
        """
        Gets the results of the cluster algorthm

        Arguments:
            request (HttpRequest): The request object from an HTTP request
            key (string): The user's name

        Returns:
            Response: results of the classifier in JSON format
        """
        pass

    def __get_cluster_label(self, key):
        """
        Fetches the cluster label of the specific key

        Arguments:
            key (string): The name of the user who's label is to be fetched

        Returns:
            int: The cluster label of the user
        """
        pass

    def __update_cluster_labels(self, keys):
        """
        Updates the labels for all of the users in keys

        Arguments:
            keys (list): A list of all the users' names who's cluster labels
                will be updated
        """
        pass

    def __fetch_batch(self):
        """
        Gets the dictionary for the current cluster analysis batch

        Returns:
            dictionary {string: int}: The dictionary holding the current batch
                of users names (key) and their cluster analysis results (value)
        """
        pass


class Monte_carlo_API(APIView):
    """
    Facilitates data transfer from the Monte_carlo class

    Attributes:
        sim (Monte_carlo): The monte_carlo simulation object
        request_data (dictionary {string: numPy.array}): A dictionary consisting
            of the users' names (key) and the results of their monte_carlo
            simulation (value)
    """
    permission_classes = [permissions.IsAuthenticated]        

    def get(self, request):
        """
        Gets the results of the monte_carlo simulation

        Arguments:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: results of the monte_carlo simulation in JSON format
        """
        
        try:
            results = MonteResults.objects.get(user_id=request.user.pk)
            if results.running:
                return Response(data={"detail": "Simulation in progress"}, status=status.HTTP_202_ACCEPTED)
            else:
                monte_serializer = MonteResultsSerializer(results)
                return Response(data=monte_serializer.data, status=status.HTTP_200_OK)
        except MonteResults.DoesNotExist:
            return Response(data={"detail": "No Monte Carlo results for this account found"},
                            status=status.HTTP_204_NO_CONTENT)

    def post(self, request):
        """
        Gets the results of the monte_carlo simulation

        Arguments:
            request (HttpRequest): The request object from an HTTP request

        Returns:
            Response: results of the monte_carlo simulation in JSON format
        """

        user_data = self.__aggregate_data(request.user)
        if not user_data:
            return Response(data={"Error": "You must create Portfolio accounts and add holdings before running a simulation"},
                            status=status.HTTP_400_BAD_REQUEST)
        valid, data = self.__is_valid(request.data)
        # print(data)
        if valid:
            data.update(user_data)
            data.update({"user": request.user})
            query, created = MonteResults.objects.get_or_create(user=request.user, defaults={"running": True})
            if created:
                sim_thread = threading.Thread(target=initiate_sim, args=(data,))
                sim_thread.start()
                return Response(data={"detail": "Simulation Initiated"}, status=status.HTTP_201_CREATED)
            elif not query.running:
                entry = MonteResults.objects.select_for_update(nowait=True).filter(user=request.user)
                with transaction.atomic():
                    entry.update(running=True, date=now())
                sim_thread = threading.Thread(target=initiate_sim, args=(data,))
                sim_thread.start()
                return Response(data={"detail": "Simulation Initiated"}, status=status.HTTP_201_CREATED)
            elif query.running:
                # Current simulation running status is invalid
                if (now() - query.date) > datetime.timedelta(minutes=15):
                    sim_thread = threading.Thread(target=initiate_sim, args=(data,))
                    sim_thread.start()
                    return Response(data={"detail": "Simulation Initiated"}, status=status.HTTP_201_CREATED)
                else:
                    return Response(data={"detail": "Simulation in progress"}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(data={"Error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

    def __is_valid(self, request_data):
        valid_data = {"retire_year": None,
                      "end_year": None,
                      "contribution": None,
                      "monthly_withdrawal": None,
                      "inflation": None,
                      "retirement_allocation": None
                      }
        resp = {}
        valid = True
        for key in valid_data:
            try:
                resp[key] = request_data[key]
            except KeyError:
                resp.update({key: str(key) + " is a required field"})
                valid = False
        return valid, resp

    def __aggregate_data(self, user):
        """
        Combines the request data and stores it in the corresponding key

        Arguments:
            request_data (list): A list holding the request data to be combined
            key (string): The name of the user to store the combined request data
                under

        Returns:
            dict: A dictionary container the key value pair of the aggregated data
        """
        portfolios = Portfolio.objects.filter(user=user)
        if len(portfolios) == 0:
            return None
        port_serializer = PortfolioSerializer(portfolios, many=True)
        values = {"Stocks": 0, "Bonds": 0}
        total = 0
        for portfolio in port_serializer.data:
            holdings = Holding.objects.filter(pk__in=portfolio["holdings"])
            hold_serializer = HoldingSerializer(holdings, many=True)
            for holding in hold_serializer.data:
                # print(holding)
                if holding["security_type"] == "Equity":
                    value = eval(holding["price"]) * eval(holding["shares"])
                    values["Stocks"] += value
                    total += value
                elif holding["security_type"] == "Fixed Income Securities":
                    value = eval(holding["price"]) * eval(holding["shares"])
                    values["Bonds"] += value
                    total += value
        if total > 0:
            allocations = {"Stocks": values["Stocks"] / total, "Bonds": values["Bonds"] / total}
        else:
            allocations = {"Stocks": 0, "Bonds": 0}
        return {"values": values, "allocations": allocations}


def initiate_sim(valid_data):
    retire_year = valid_data["retire_year"]
    end_year = valid_data["end_year"]
    inflation = valid_data["inflation"]
    contribution = valid_data["contribution"]
    withdrawal = valid_data["monthly_withdrawal"]
    port_values = valid_data["values"]
    port_allocations = valid_data["allocations"]
    if valid_data["retirement_allocation"]:
        retirement_allocation = valid_data["retirement_allocation"]
    else:
        retirement_allocation = None

    sim = PortfolioSim(retire_year, end_year, port_values, contribution, withdrawal, inflation,
                       port_allocations, retirement_allocation, iterations=1000)
    sim.run_sim()
    results = sim.get_results()
    # print(results)
    # Store in DB
    entry = MonteResults.objects.get(user=valid_data["user"])
    entry.results = {"future_values": results}
    entry.running = False
    entry.save(update_fields=['results', 'running'])
