from django.contrib import admin
from .models import Review

# Register your models here.
@admin.register(Review)
class RentalAdmin(admin.ModelAdmin):
    list_display = ('name', 'score')
    ordering = ('score',)