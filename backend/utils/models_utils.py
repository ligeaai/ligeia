from rest_framework.exceptions import ValidationError

from services.logging.Handlers import KafkaLogger 
models = {
            "CODE_LIST":['LIST_TYPE','CULTURE','CODE','ROW_ID','LAYER_NAME'],
            "ITEM":["ITEM_ID","ITEM_TYPE","START_DATETIME","LAST_UPDT_USER"],
            "ITEM_PROPERTY":["VALUE","VALUE_TYPE"],
            "LAYER":["LAYER_NAME","LAYER_LEVEL","LAST_UPDT_USER","LAST_UPDT_DATE"],
            "RESOURCE_LIST":["CULTURE","ID","LAYER_NAME"],
            "TYPE":["TYPE","TYPE_CLASS","LAYER_NAME","ROW_ID"],
            "TYPE_PROPERTY":["TYPE","PROPERTY_NAME","LAYER_NAME","ROW_ID"],
            "TYPE_LINK":["TYPE","FROM_TYPE","FROM_TYPE_CLASS","TO_TYPE","TO_TYPE_CLASS","LAYER_NAME","ROW_ID"]
        }
logger = KafkaLogger()

def validate_model_not_null(data,model,request):
        callback = []
        model = str(model).upper()
        for keys in models.get(model):
            if not data.get(keys):
                callback.append(keys)
       
        if callback:
            message_dict = {"Message":"These lines need to be filled " + str(callback)}
            logger.error(request=request, message=message_dict ,error="ValidationError validate_model_not_null")
            raise ValidationError(
                {"Message":message_dict})
        
        
def null_value_to_space(serializer,request):
    try:
        for index in range(0, len(serializer)):
            item = serializer[index]
            for keys, value in item.items():
                if value is None or value == "NONE":
                    serializer[index][keys] = ""
        return serializer
    except Exception as e:
        message_dict = {"Message": e }
        logger.error(request=request, message=message_dict ,error="ValidationError null_value_to_space")
        raise ValidationError(message_dict)

def space_value_to_null(item,request):
    try:
        for keys,value in item.items():
                if value == "":
                    item[keys] = None
        return item
    except Exception as e:
        message_dict = {"Message": e }
        logger.error(request=request, message=message_dict ,error="ValidationError null_value_to_space")
        raise ValidationError(message_dict)
    
       
def validate_value(validated_data,model,request):
    callback = []
    model = str(model).upper()
    model = models.get(model)
    for keys,value in validated_data.items():
        try:
            index = model.index(keys)
            if not value: 
                callback.append(keys)
        except:    
            pass
    if callback:
        message_dict = {"Message": "These values cannot be null  " + str(callback) }
        logger.error(request=request, message=message_dict ,error="ValidationError validate_value")
        raise ValidationError(message_dict)


def validate_find(quaryset,request):
    if quaryset:
        return quaryset
    else:
        logger.error(request=request, message="Data not found",error="ValidationError validate_find")
        raise ValidationError(
                 {"Message": "Data not found"})

