from rest_framework import serializers
from django.contrib.auth import authenticate

from inventario.inventario_backend.auth_app.models.usuarioModelo import Usuario

class UsuarioSerializer(serializers.ModelSerializer): # Cambiado de UserSerializer a UsuarioSerializer para claridad
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'phone_number', 'user_type') # ¡Añade tus nuevos campos!

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'password', 'phone_number', 'user_type') # ¡Añade tus nuevos campos para el registro!
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Usa el método create_user de tu modelo Usuario (que hereda de AbstractUser)
        user = Usuario.objects.create_user( # ¡CAMBIO AQUÍ!
            validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number'), # Asegúrate de obtener los nuevos campos
            user_type=validated_data.get('user_type', 'secretario') # Con un valor por defecto si no se envía
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        # authenticate() ya sabe qué modelo de usuario usar gracias a AUTH_USER_MODEL
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Credenciales incorrectas.")