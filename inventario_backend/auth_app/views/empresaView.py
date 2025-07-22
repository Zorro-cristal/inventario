from rest_framework import generics, permissions

from inventario.inventario_backend.auth_app.models.empresaModelo import Empresa
from inventario.inventario_backend.auth_app.serializers.empresaSerializer import EmpresaSerializer

class EmpresaListCreateView(generics.ListCreateAPIView):
    serializer_class = EmpresaSerializer
    
    # ¡Importante! Estas líneas aseguran que solo usuarios autenticados puedan acceder.
    # El token enviado por el frontend será verificado aquí.
    authentication_classes = [
        # Por defecto ya está configurado en settings.py, pero es bueno ser explícito si es necesario
        # 'rest_framework.authentication.TokenAuthentication',
    ]
    permission_classes = [permissions.IsAuthenticated] # ¡Solo usuarios logueados!

    # Método para obtener el queryset (la consulta) de empresas
    def get_queryset(self):
        """
        Devuelve solo las empresas que pertenecen al usuario autenticado.
        self.request.user es la instancia del modelo Usuario (tu Usuario personalizado)
        que está logueado, gracias a TokenAuthentication.
        """
        if self.request.user.is_authenticated:
            # Filtra las empresas por el campo 'owner' que creamos
            return Empresa.objects.filter(owner=self.request.user)
        # Si por alguna razón no está autenticado (aunque permission_classes lo impide), devuelve vacío
        return Empresa.objects.none() 

    # Método que se ejecuta antes de guardar un nuevo objeto (Empresa) al crearlo via POST
    def perform_create(self, serializer):
        """
        Asigna automáticamente el usuario autenticado como 'owner' de la nueva empresa.
        """
        serializer.save(owner=self.request.user) # Asigna el propietario antes de guardar