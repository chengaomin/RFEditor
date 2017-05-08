import os.path
import tempfile
import sys

reload(sys)
sys.setdefaultencoding('utf-8') 

class RFListener:
    ROBOT_LISTENER_API_VERSION = 2
    def __init__(self, *args):
        self.outpath = os.path.join(tempfile.gettempdir(), args[0],'runing.txt')
        # outpath = 'd:/ll.txt'args[0]
        self.outfile = open(self.outpath, 'w')

    def start_suite(self, name, attrs):
        pass

    def start_test(self, name, attrs):
        self.outfile = open(self.outpath, 'a')
        self.outfile.writelines("Starting test: %s\n" % attrs['longname'])
        self.outfile.flush()
        self.outfile.close()

    def log_message(self, message):    
        self.outfile = open(self.outpath, 'a')
        self.outfile.writelines("%s : %s : %s\n" % (message['timestamp'],message['level'],message['message']))
        self.outfile.flush()
        self.outfile.close()

    def end_test(self, name, attrs):
        self.outfile = open(self.outpath, 'a')
        self.outfile.writelines("Ending test: %s\n\n" % attrs['longname'])
        self.outfile.flush()
        self.outfile.close()

    def end_suite(self, name, attrs):
        pass
        
    def close(self):
        self.outfile.close()
