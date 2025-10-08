import os
import shutil

frontend_build_path = './../../frontend/dist/rxvis-extension/browser'
frontend_dest_path = './dist/rxvis-extension/browser'
extension_files_to_copy_path = './src/chrome-extension-js'
extension_dest_path = './dist/rxvis-extension'

def create_dest_directories():
    os.makedirs(extension_dest_path, exist_ok=True)
    os.makedirs(frontend_dest_path, exist_ok=True)

def copy_extension_files():
    print("Copying extension files...")
    for item in os.listdir(extension_files_to_copy_path):
        src = os.path.join(extension_files_to_copy_path, item)
        dst = os.path.join(extension_dest_path, item)
        if os.path.isdir(src):
            if os.path.exists(dst):
                shutil.rmtree(dst)
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)


def copy_frontend_build():
    print("Copying built Angular files...")
    for item in os.listdir(frontend_build_path):
        src = os.path.join(frontend_build_path, item)
        dst = os.path.join(frontend_dest_path, item)
        if os.path.isdir(src):
            if os.path.exists(dst):
                shutil.rmtree(dst)
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)

def main():
    create_dest_directories()
    copy_extension_files()
    copy_frontend_build()
    print("Done!")

if __name__ == "__main__":
    main()
