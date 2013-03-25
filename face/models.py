#!/usr/bin/env python
# encoding=utf-8
# maintainer: Fadiga

import datetime
from django.db import models
from tinymce.models import HTMLField


class Picture(models.Model):
    """ Le modele qui contiendra toute les liens des photo et ses votes.
        Les liens poiterons sur facebook.
        Les votes sont faite par les visiteurs du site.
    """

    SEX_MALE = 'M'
    SEX_FEMELLE = 'F'
    SEX_CHOICES = (
        (SEX_MALE, u"Masculin"),
        (SEX_FEMELLE, u"Féminin"),)

    date = models.DateField(verbose_name=("Date d'inscription"),
                                             default=datetime.datetime.today)
    link = models.CharField(max_length=100, verbose_name=("Lien de l'image"), unique=True)
    favorable = models.IntegerField(verbose_name=("favorable"), default=0)
    # unfavorable = models.IntegerField(verbose_name=("Defavorable"), default=0)
    sex = models.CharField(u"Sexe", max_length=1, choices=SEX_CHOICES)
    status = models.BooleanField(default=True, verbose_name=("Visible"))

    def __unicode__(self):
        return (u'%(link)s %(status)s') % \
                   {'link': self.link, 'status': self.status}

    def to_dict(self):
        d = super(Picture, self).to_dict()
        d.update({'link': self.link, 'favorable': self.favorable,
                  'sex': self.sex})
        return d


class Vote(models.Model):
    """ Chaque vote """
    picture = models.ForeignKey(Picture, verbose_name=("Photo"))
    date = models.DateTimeField(verbose_name=("Date du vote"),
                                               default=datetime.datetime.today)
    yes = models.BooleanField(default=False, verbose_name=("Oui/Non"))

    def __unicode__(self):
        return (u'%(date)s %(yesno)s') % \
                   {'date': self.date, 'yesno': self.yesno}

    def save(self):
        if self.yes:
            self.picture.favorable += 1
            self.picture.save()
        super(Vote, self).save()


class TextStatic(models.Model):
    slug = models.SlugField("Code", max_length=75, primary_key=True)
    text = HTMLField(blank=True, verbose_name=("Texte"))

    def __unicode__(self):
        return (u'%(slug)s') % {'slug': self.slug}
