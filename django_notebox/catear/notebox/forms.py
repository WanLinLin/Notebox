from django import forms

class RegistrationForm(forms.Form):
    name = forms.CharField(label='Your Name', max_length=100, required=True)
    email = forms.EmailField(label='E-mail', required=True)
    password = forms.CharField(widget=forms.PasswordInput, max_length=200, label='Password', required=True)

class LoginForm(forms.Form):
    email = forms.EmailField(label='E-mail', required=True)
    password = forms.CharField(widget=forms.PasswordInput, max_length=200, label='Password', required=True)