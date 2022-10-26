from rest_framework.exceptions import ValidationError 


def validate_model_not_null(data,model):
        models = {
            "CODE_LIST":['LIST_TYPE','CULTURE','CODE','ROW_ID','LAYER_NAME'],
            "ITEM":["ITEM_ID","ITEM_TYPE","START_DATETIME","LAST_UPDT_USER"],
            "ITEM_PROPERTY":["VALUE","VALUE_TYPE"],
            "LAYER":["LAYER_NAME","LAYER_LEVEL","LAST_UPDT_USER","LAST_UPDT_DATE"],
            "RESOURCE_LIST":["CULTURE","ID","LAYER_NAME"],
            "TYPE":["TYPE","TYPE_CLASS","LAYER_NAME","ROW_ID"],
            "TYPE_PROPERTY":["TYPE","PROPERTY_NAME","LAYER_NAME","ROW_ID"],
            "TYPE_LINK":["TYPE","FROM_TYPE","FROM_TYPE_CLASS","TO_TYPE","TO_TYPE_CLASS","LAYER_NAME"]
        }
       
        callback = []
        model = str(model).upper()
        for keys in models.get(model):
            if not data.get(keys):
                callback.append(keys)
       
        if callback:
            message = "These lines need to be filled " + str(callback)
            raise ValidationError(
                {"Message":message})
        
        
def null_value_to_space(serializer):
    for index in range(0, len(serializer.data)):
        item = serializer.data[index]
        for keys, value in item.items():
            if value is None or value == "NONE":
                serializer.data[index][keys] = ""
    return serializer

def validate_value(validated_data):
    callback = []
    for keys,value in validated_data.items():
        if not value: 
            callback.append(keys)
    if callback:
        raise ValidationError(
                {"Message": "These values cannot be null  " + str(callback) })