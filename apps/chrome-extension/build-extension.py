import os
import shutil

extension_files_to_copy_path = './src/chrome-extension-js'
ui_build_path = './../../dist/ui-host/browser'
extension_dest_path = './../../dist/rxvision-extension'
extension_dest_path_browser = extension_dest_path + '/browser'


def create_dest_directories():
    os.makedirs(extension_dest_path, exist_ok=True)
    os.makedirs(extension_dest_path_browser, exist_ok=True)


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


def copy_ui_angular_build():
    print("Copying built Angular files...")
    for item in os.listdir(ui_build_path):
        src = os.path.join(ui_build_path, item)
        dst = os.path.join(extension_dest_path_browser, item)
        if os.path.isdir(src):
            if os.path.exists(dst):
                shutil.rmtree(dst)
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)


def main():
    create_dest_directories()
    copy_extension_files()
    copy_ui_angular_build()
    print("Done!")


if __name__ == "__main__":
    main()
