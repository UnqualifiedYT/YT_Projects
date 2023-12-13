import main
import os

with open('main2.py', 'r') as f:
    content = f.read()

with open('main.py', 'r') as fp:
    writeIndex = fp.read().find('#@^' + '/')+5
    
with open('main2.py', 'w') as f:
    f.write(content[:writeIndex] + '\n' +  "print('WOOOOAAAAHHHH!!!')" + '\n' + content[writeIndex:])


# with open('main.py', 'r') as f:
#     print(f.read())

#@^/

os.system('python3 main2.py')