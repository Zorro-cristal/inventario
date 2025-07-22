from django.contrib.auth.models import AbstractUser # Importa AbstractUser
from django.db import models

class Usuario(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True, verbose_name="Número de Teléfono")
    user_type = models.CharField(
        max_length=20,
        choices=[('admin', 'Administrador'), ('medico', 'Médico'), ('secretario', 'Secretario')],
        default='secretario',
        verbose_name="Tipo de Usuario"
    )

    class Meta:
        verbose_name = "Usuario Personalizado"
        verbose_name_plural = "Usuarios Personalizados"

    def __str__(self):
        return self.username