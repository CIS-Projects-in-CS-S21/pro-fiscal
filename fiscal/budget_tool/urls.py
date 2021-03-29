from django.urls import path
from budget_tool import views

urlpatterns=[
    path('expense/', views.ExpenseList.as_view()),
    path('expense/<int:pk>', views.ExpenseDetail.as_view())
]