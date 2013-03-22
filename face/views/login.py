#!/usr/bin/env python
# -*- coding: utf-8 -*-
# maintainer: Alou & Fadiga


from django import forms
from django.shortcuts import (redirect, render, HttpResponseRedirect)
from django.core.context_processors import csrf
from django.contrib.auth import (authenticate, login as django_login,
                                                logout as django_logout)
from django.core.urlresolvers import reverse


class LoginForm(forms.Form):
    username = forms.CharField(max_length=100, label="Identifiant")
    password = forms.CharField(max_length=100, label="Mot de passe",
                               widget=forms.PasswordInput)


def login(request):
    """ Page de connection """

    form = LoginForm()
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('edit_text_static'))
    else:
        c = {}
        c.update(csrf(request))
        state = "Se connecter"

        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    django_login(request, user)
                    return HttpResponseRedirect(reverse('edit_text_static'))
                else:
                    state = "Your Account is not active,\
                                        please contact the site admin."
            else:
                state = u"Votre nom d'utilisateur et / ou \
                                    votre mot de passe est incorrect. \
                                    Veuillez réessayer."

        c.update({'form': form, 'state': state})
    return render(request, 'login.html', c)


def logout(request):
    """ logout est la views qui permet de se deconnecter """

    django_logout(request)
    return redirect("dashboard")
