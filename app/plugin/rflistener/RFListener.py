import os.path
import tempfile
import sys
import socket

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
        self.server.send("Starting test: %s\n" % attrs['longname'])

    def log_message(self, message):    
        self.server.send("%s : %s : %s\n" % (message['timestamp'],message['level'],message['message']))


    def end_test(self, name, attrs):
        self.server.send("Ending test: %s\n\n" % attrs['longname'])
        # print attrs['status']

    def end_suite(self, name, attrs):
        pass
        
    def close(self):
        pass
