from bs4 import BeautifulSoup

from django.shortcuts import render
from django.core.files import File

from django.http import HttpResponse

import xml.etree.ElementTree as ET
import os.path

tree = ET.parse("C:/Users/azeitengazin/Desktop/copy/pars/parsing/xml/DBInfo.xml")
root = tree.getroot()

print(root)

column_types = {
    'Varchar': 'CharField',
    'NumericData': 'IntegerField',
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
            columns.append ({
                'column_name': column.get('Name'), # 'column_name' = "LIST_TYPE"
                'column_type': column_types[column.get('LogicalDbType')], # 'column_type' = column_types[Varchar]
                'precision': column.get('Precision'),
                'identity': column.get('IsIdentity'), 
                'null': column.get('IsNullable'),
                'DefaultValueType': column.get('DefaultValueType'),
                'PkOrder': column.get('PkOrder')
                })
   
        model_content = render(request, 'new/model.html', {'table_name': table.get('Name'), 'column': columns})

        soup = BeautifulSoup(model_content.content)
      #  print(soup.get_text())

       

        model_file = open("C:/Users/azeitengazin/Desktop/copy/pars/parsing/models/{0}.py".format(column.get('DbColumn')), "w") # f = open("", "")

        model_file.write(soup.get_text())
        
   #     print(model_file.read())
    
        return HttpResponse(soup.get_text())
    # return HttpResponse("Hello, world!")

# def index1(request):
#     model_content = render(request, 'new/index.html', {'table': tables, 'column': columns})
#     f = open("C:/Users/akyzdarbek/Desktop/copy/pars/parsing/models/model1.py", "wt")
#     f.write(model_content)