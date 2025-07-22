from django.contrib import admin
from .models import Empresa, Modulo 

@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'ruc', 'telefono', 'owner', 'fecha_creacion')
    search_fields = ('nombre', 'ruc', 'owner__username', 'owner__email')
    list_filter = ('owner', 'fecha_creacion')
    raw_id_fields = ('owner',)

@admin.register(Modulo)
class ModuloAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'empresa', 'id')
    search_fields = ('nombre', 'empresa__nombre')
    list_filter = ('empresa',)