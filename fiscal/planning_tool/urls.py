from django.urls import path
from planning_tool import views

urlpatterns=[
    path('portfolio/', views.PortfolioList),
    path('portfolio/<int:pk>', views.PortfolioDetail)
]