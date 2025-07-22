from django.conf import settings
from django.db import models

class Empresa(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=70)
    razon_social = models.CharField(max_length=100)
    ruc = models.CharField(max_length=10, unique=True)
    estado = models.CharField(max_length=10, choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')])
    direccion = models.CharField(max_length=150, blank=True, null=True)
    ciudad = models.CharField(max_length=15, blank=True, null=True)
    pais = models.CharField(max_length=3, blank=True, null=True)
    telefono = models.IntegerField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    ultima_modificacion = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='empresas',
        verbose_name="Propietario"
    )
    
    def __str__(self):
        return self.id + ": " +self.nombre
    
    class Meta:
        verbose_name = "Empresa"
        verbose_name_plural = "Empresas"
        ordering = ['nombre'] # Ordenar por nombre por defecto