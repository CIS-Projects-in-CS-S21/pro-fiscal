from django.urls import path
from planning_tool import views

urlpatterns=[
    path('portfolio/', views.PortfolioList.as_view(), name="portfolio_list"),
    path('portfolio/<int:pk>', views.PortfolioDetail.as_view(), name="portfolio_detail")
]