import os.path
import tempfile
import sys
import socket
import time


reload(sys)
sys.setdefaultencoding('utf-8') 



class RFListener:
    ROBOT_LISTENER_API_VERSION = 2
    def __init__(self, *args):
        self.server = socket.socket( socket.AF_INET, socket.SOCK_STREAM )
        self.server.connect(( "127.0.0.1", 9000))
        
    def start_suite(self, name, attrs):
        pass

    def start_test(self, name, attrs):
        self.send_to_ui("log","Starting test: %s\n" % attrs['longname'])

    def log_message(self, message):    
        self.send_to_ui("log","%s : %s : %s\n" % (message['timestamp'],message['level'],message['message']))

    def start_keyword(self, name, attrs):
        self.send_to_ui("keyword","Current Keyword: %s.%s" % (attrs['libname'],attrs['kwname']))

    def end_test(self, name, attrs):
        self.send_to_ui("log","Ending test: %s\n\n" % attrs['longname'])
        self.send_to_ui("status",attrs['status'])
        # print attrs['status']

    def end_suite(self, name, attrs):
        pass
        
    def close(self):
        self.server.close()

    def send_to_ui(self,type,message):
        time.sleep(0.01)
        if type=='log':
            self.server.sendall('l'+message)
        elif type=='keyword':
            self.server.sendall('k'+message)
        elif type=='status':
            self.server.sendall('s'+message)