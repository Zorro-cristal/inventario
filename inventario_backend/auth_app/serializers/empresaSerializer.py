from rest_framework import serializers

from inventario.inventario_backend.auth_app.models.empresaModelo import Empresa

class EmpresaSerializer(serializers.ModelSerializer):
    # Si quieres que el serializador de Empresa muestre el nombre del owner en lugar de solo el ID
    # owner_username = serializers.CharField(source='owner.username', read_only=True)
    class Meta:
        model = Empresa
        fields = ('id', 'nombre', 'ruc', 'direccion', 'telefono', 'email', 'fecha_creacion', 'ultima_modificacion', 'owner') # Incluí owner para que se vea
        read_only_fields = ('fecha_creacion', 'ultima_modificacion', 'owner')
