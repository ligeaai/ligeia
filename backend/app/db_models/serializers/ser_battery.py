
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from ..models import Battery


# class CompanyListSerializer(serializers.ModelSerializer):
#     company_ref = serializers.CharField(source='*')

#     class Meta:
#         model = Company
#         fields = ('company_ref', )

class BatterySerializer(serializers.ModelSerializer):
    # company_ref = serializers.SlugRelatedField(many=False, read_only=False, slug_field="name")
    # company_ref = serializers.PrimaryKeyRelatedField(
    #     queryset=Company.objects.all(), source='company_ref', allow_null=False, required=True
    # )
    class Meta:
        model = Battery
        fields = '__all__'
        # fields = ('id','name','parent', 'children')