from django.db import models
from django.conf import settings # Importa settings para referenciar AUTH_USER_MODEL

class Modulo(models.Model):
    # El campo 'id' se crea automáticamente como PrimaryKey
    nombre = models.CharField(max_length=70)
    
    # ¡Importante! 'on_delete' y el nombre del campo 'empresa'
    empresa = models.ForeignKey(
        'Empresa', # Referencia al modelo Empresa en la misma app
        on_delete=models.CASCADE, # Si la empresa se elimina, también sus módulos
        related_name='modulos',   # Permite acceder a los módulos desde una empresa (ej. empresa.modulos.all())
        verbose_name="Empresa Asociada"
    )
    
    def __str__(self):
        # Usamos un f-string para formatear la salida correctamente
        return f"{self.id}: {self.nombre} ({self.empresa.nombre})"
    
    class Meta:
        verbose_name = "Módulo" # Corregido a singular con tilde
        verbose_name_plural = "Módulos" # Corregido a plural con tilde
        ordering = ['nombre'] # Ordenar por nombre por defecto