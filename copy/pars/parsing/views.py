from bs4 import BeautifulSoup

from django.shortcuts import render
from django.core.files import File

from django.http import HttpResponse

import xml.etree.ElementTree as ET
import os.path



tree = ET.parse("C:/Users/azeitengazin/Desktop/DS/ligeia.ai/copy/pars/parsing/xml/DBInfo.xml")
root = tree.getroot()

print(root)



column_types = {
    'Varchar': 'CharField',
    'NumericData': 'DecimalField',
    'Unicode': 'CharField',
    'Date': 'DateField',
    'Char': 'CharField'
}

# tables = []
# for table in root.findall('.//DbTable') : # table = (Name="CODE_LIST" TablespaceName="PRIMARY")

#     tables.append ({
#         'table_name': table.get('Name'),
#     })
    
#     columns = []
#     for column in table.findall('.//DbColumn'): # column = (Name="LIST_TYPE" Precision="100" IsIdentity="False" IsNullable="False" LogicalDbType="Varchar")
#         columns.append ({
#             'column_name': column.get('Name'), # 'column_name' = "LIST_TYPE"
#             'column_type': column_types[column.get('LogicalDbType')], # 'column_type' = column_types[Varchar]
#             'precision': column.get('Precision'),
#             'identity': column.get('IsIdentity'), 
#             'null': column.get('IsNullable'),
#             'DefaultValueType': column.get('DefaultValueType'),
#             'PkOrder': column.get('PkOrder')
#             })


def index(request):
   # return render(request, 'new/index.html', {'table': tables, 'column': columns})
   # tables = []
    for table in root.findall('.//DbTable') : # table = (Name="CODE_LIST" TablespaceName="PRIMARY")

        # tables.append ({
        #     'table_name': table.get('Name'),
        # })
    
        columns = []
        for column in table.findall('.//DbColumn'): # column = (Name="LIST_TYPE" Precision="100" IsIdentity="False" IsNullable="False" LogicalDbType="Varchar")
            column_attr =     {
                    # 'max_length': column.get('Precision'),
                    'decimal_places': column.get('Scale'),
                    # 'primary_key': column.get('IsIdentity'), 
                    'null': column.get('IsNullable'),
                    'default': column.get('DefaultValueType'),
                    'primary_key': column.get('PkOrder')
                }
            if column_types[column.get('LogicalDbType')] == "DecimalField" :
                column_attr['max_digits'] = column.get('Precision')
            else : column_attr['max_length']= column.get('Precision')
            

            columns.append ({
                'column_name': column.get('Name'), # 'column_name' = "LIST_TYPE"
                'column_type': column_types[column.get('LogicalDbType')], # 'column_type' = column_types[Varchar]
                'column_attr' : {k: v for k, v in column_attr.items() if v is not None}
            })
        
   
        model_content = render(request, 'new/model.html', {'table_name': table.get('Name').lower(), 'column': columns})

        soup = BeautifulSoup(model_content.content)
      #  print(soup.get_text())

       

        model_file = open("C:/Users/azeitengazin/Desktop/DS/ligeia.ai/copy/pars/parsing/models/"+table.get('Name').lower()+".py", "w") # f = open("", "")

        model_file.write(soup.get_text())
        
   #     print(model_file.read())
    
    return HttpResponse(soup.get_text())
    # return HttpResponse("Hello, world!")