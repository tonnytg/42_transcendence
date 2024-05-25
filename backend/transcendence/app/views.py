# Create your views here.
from django.shortcuts import render

# Create a dummy list containing the data of a user as a dictionary.
users = [
    {
        "name":"Nikhil Raj",
        "college":"Heritage Institute of Technology",
        "linkedin_url":"https://www.linkedin.com/in/nikhil-raj-117246232/",
        "github_url":"https://github.com/nikhil25803"
    }
]

# Create your views here.

def index(request):

    # Map the list with a key value `data`
    context = {
        "datas" : users
    }

    # Pass the context along with the template
    return render(request, "index.html", context)