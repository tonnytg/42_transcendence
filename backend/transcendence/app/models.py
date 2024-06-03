from django.db import models

# Create users table
class User(models.Model):
	"""
	Represents a user in the system.

	Attributes:
		name (str): The name of the user. max_length=100
		nick (str): The nickname of the user. max_length=50, unique(unique garanties that there are no two users with the same nickname)
		score (int): The score of the user. default=0 (if not specified, the score will be 0)
		password (str): The password of the user. max_length=255(sha256 hash of the password)
	"""

	name = models.CharField(max_length=100)
	nick = models.CharField(max_length=50, unique=True)
	score = models.IntegerField(default=0)
	password = models.CharField(max_length=255)

	def __str__(self):
		return self.name
