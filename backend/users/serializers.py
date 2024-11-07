from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

User = get_user_model()

class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'password', 'account_type']

    def validate_email(self, value):
        """Ensure the email is unique"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def validate_account_type(self, value):
        """Optional: Add validation for account types"""
        valid_account_types = ['client', 'admin', 'agent', 'cashier', 'information']
        if value not in valid_account_types:
            raise serializers.ValidationError(f"Invalid account type. Valid types are: {', '.join(valid_account_types)}")
        return value
