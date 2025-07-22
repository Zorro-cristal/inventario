from rest_framework import serializers
from auth_app.serializers import UsuarioSerializer
from inventario.inventario_backend.auth_app.models.moduloModelo import Modulo # Si quieres mostrar info del owner en EmpresaSerializer

class ModuloSerializer(serializers.ModelSerializer):
    # Para la lectura, puedes mostrar el nombre de la empresa asociada en lugar de solo su ID
    empresa_nombre = serializers.CharField(source='empresa.nombre', read_only=True)

    class Meta:
        model = Modulo
        # Para crear/actualizar, el cliente enviará 'empresa' (el ID de la empresa)
        # Para listar/leer, mostraremos 'empresa_nombre' además del 'empresa' ID
        fields = ('id', 'nombre', 'empresa', 'empresa_nombre')
        read_only_fields = ('id', 'empresa_nombre') # 'id' y 'empresa_nombre' son de solo lectura