from django.shortcuts import render

import xml.etree.ElementTree as ET
import os.path

tree = ET.parse("DBInfo.xml")
root = tree.getroot()

print(root)

column_types = {
    'Varchar': 'CharField',
    'NumericData': 'IntegerField',
    'Unicode': 'CharField',
    'Date': 'DateField',
    'Char': 'CharField'
}

for table in root.findall('.//DbTable') :
    model_name = table.get('Name')
    columns = []
    for column in table.findall('.//DbColumn'):
        columns.append ({
            'column_name': column.get('Name'),
            'column_type': column_types[column.get('LogicalDbType')]
            })
                
        
        

        

    
        

        
   
    
    
