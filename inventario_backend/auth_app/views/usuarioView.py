from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from inventario.inventario_backend.auth_app.serializers.usuarioSeriallizer import LoginSerializer, RegisterSerializer, UsuarioSerializer

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # Asegúrate de que el token se cree para tu modelo Usuario
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UsuarioSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key,
            "message": "Usuario registrado exitosamente."
        })

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UsuarioSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # self.request.user ya será una instancia de tu modelo Usuario
        return self.request.user