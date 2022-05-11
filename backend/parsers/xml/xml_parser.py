
import pandas as ds
import xml.etree.ElementTree as et
import os.path

document = et.parse("C:/igeia.ai/backend/apps/db_models/DbInfo.xml", 'r')

# df = ds.read_xml("C:/igeia.ai/backend/apps/db_models/DbInfo.xml")

print(document)
