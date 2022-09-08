from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes', views.getNotes, name="notes"),
    path('notes/create/', views.createNote, name="create-note"),
    path('notes/<int:nid>/', views.getNote, name="note"),
    path('notes/<int:nid>/update/', views.updateNote, name="update-note"),
    path('notes/<int:nid>/delete/', views.deleteNote, name="delete-note"),
]