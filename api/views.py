from django.core.handlers.wsgi import WSGIRequest
from django.views.decorators.csrf import csrf_exempt
from django.http import response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from json import loads
from .models import Note
from .serializers import NoteSerializer

# Create your views here.


def getRoutes(request):
    return Response("Our API")


@api_view(["GET"])
def getNotes(request):
    notes = Note.objects.all().order_by("-updated")
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getNote(request, nid):
    note = Note.objects.get(id=nid)
    serializer = NoteSerializer(note)
    return Response(serializer.data)

@api_view(["DELETE"])
def deleteNote(request, nid):
    note = Note.objects.get(id=nid)
    note.delete()
    return response.JsonResponse("Note deleted", safe=False)

@api_view(["PUT"])
def updateNote(request: WSGIRequest, nid):
    data = loads(request.body)
    note = Note.objects.get(id=nid)
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid(True):
        serializer.save()
    return response.JsonResponse(data)


@api_view(["POST"])
def createNote(request):
    data = request.data
    note = Note.objects.create(body=data["body"])
    serializer = NoteSerializer(note)
    return response.JsonResponse(serializer.data)