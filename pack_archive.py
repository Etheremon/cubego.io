import sys, os

def pack_archive(dir_name):
    import zipfile
    import os

    def filter_dir(dirpath):
        dir_list = dirpath.split(os.path.sep)
        for idx, dirname in enumerate(dir_list):
            if len(dirname) > 1 and dirname.startswith('.'):
                if idx == len(dir_list) - 1:
                    return False
                else:
                    return None
        return True

    def filter_file(filename):
        if filename.endswith('.zip'):
            return False
        if filename.endswith('.pyc'):
            return False
        if '.log' in filename:
            return False
        if filename.startswith('.') and not filename.endswith('.gitkeep'):
            return False
        return True

    archive_name = dir_name + '.zip'
    print 'Packing', archive_name
    f = zipfile.ZipFile(archive_name, 'w', zipfile.ZIP_DEFLATED)
    for dirpath, dirnames, filenames in os.walk('./public'):
        is_filter = filter_dir(dirpath)
        if is_filter:
            for filename in filenames:
                fullpath = os.path.join(dirpath,filename)
                if filter_file(filename):
                    print 'Include:', fullpath
                    f.write(fullpath, os.path.join(fullpath))
                else:
                    print 'Exclude:', fullpath
        elif is_filter is not None:
            print 'Exclude:', dirpath
    f.close()
    print 'Pack Complete.'

if __name__ == "__main__":
	pack_archive('cubego_client')