from django.urls import path
from planning_tool import views

urlpatterns=[
    path('portfolio/', views.PortfolioList.as_view(), name="portfolio_list"),
    path('portfolio/<int:pk>', views.PortfolioDetail.as_view(), name="portfolio_detail"),
    path('holding/', views.HoldingList.as_view(), name="holding_list"),
    path('holding/<int:pk>', views.HoldingDetail.as_view(), name="holding_detail"),
    path('account-types/', views.AccountTypeList.as_view(), name="account_type_list"),
    path('security-types/', views.SecurityTypeList.as_view(), name="security_type_list")
]