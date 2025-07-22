from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError

from inventario.inventario_backend.auth_app.models.empresaModelo import Empresa
from inventario.inventario_backend.auth_app.models.moduloModelo import Modulo
from inventario.inventario_backend.auth_app.serializers.moduloSeriallizer import ModuloSerializer # Para manejar errores de validación

# ... (Tu vista EmpresaListCreateView si la tienes aquí) ...

class ModuloListCreateView(generics.ListCreateAPIView):
    serializer_class = ModuloSerializer
    permission_classes = [permissions.IsAuthenticated] # Solo usuarios autenticados

    def get_queryset(self):
        """
        Devuelve solo los módulos de las empresas que pertenecen al usuario autenticado.
        """
        if self.request.user.is_authenticated:
            # Filtra los módulos por la empresa, y esa empresa debe pertenecer al usuario logueado
            return Modulo.objects.filter(empresa__owner=self.request.user).order_by('nombre')
        return Modulo.objects.none()

    def perform_create(self, serializer):
        """
        Asigna el módulo a una empresa que el usuario autenticado posee.
        Valida que la empresa seleccionada realmente pertenezca al usuario.
        """
        empresa_id = self.request.data.get('empresa') # Obtiene el ID de la empresa del request
        
        # Primero, verifica si la empresa existe y si pertenece al usuario logueado
        try:
            empresa = Empresa.objects.get(id=empresa_id, owner=self.request.user)
        except Empresa.DoesNotExist:
            raise ValidationError({'empresa': 'La empresa especificada no existe o no te pertenece.'})
        
        # Si la empresa es válida y pertenece al usuario, guarda el módulo
        serializer.save(empresa=empresa)