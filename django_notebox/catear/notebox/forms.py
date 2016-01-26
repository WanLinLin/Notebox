from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate as django_auth, login as django_login
from django.core.exceptions import ValidationError

def check_username(username):
    if User.objects.filter(username=username).exists():
        raise ValidationError('User exists: %s' % username)

class RegistrationForm(forms.Form):
    name = forms.CharField(label='Your Name', max_length=100, required=True)
    email = forms.EmailField(label='E-mail', required=True, validators=[check_username])
    password = forms.CharField(widget=forms.PasswordInput, max_length=200, label='Password', required=True)

    def save(self, request):
        user = User.objects.create_user(
            username=self.cleaned_data['email'], 
            email=self.cleaned_data['email'],
            password=self.cleaned_data['password'])
        user.save()

        # Log user in
        user = django_auth(username=self.cleaned_data['email'], password=self.cleaned_data['password'])
        django_login(request, user)

class LoginForm(forms.Form):
    email = forms.EmailField(label='E-mail', required=True)
    password = forms.CharField(widget=forms.PasswordInput, max_length=200, label='Password', required=True)

    def login(self, request):
        user = django_auth(username=self.cleaned_data['email'], password=self.cleaned_data['password'])
        if user is not None:
            if user.is_active:
                django_login(request, user)
                return True
            else:
                return False
        return False