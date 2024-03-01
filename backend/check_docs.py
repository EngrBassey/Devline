"""Checks for docs"""
import ast
import os


def print_error_parsing_file(file_path):
    """Print Error"""
    import ast

    try:
        with open(file_path, "r") as f:
            ast.parse(f.read())
    except SyntaxError as syntax_error:
        print("SyntaxError\n\tFile: {}\n\tLine: {}\tMessage: {}".
              format(file_path, syntax_error.lineno, syntax_error.msg))
    except Exception as e:
        print("Error Parsing File:\n\t{}".format(type(e)))


def check_module_function_class_documentation(file_path):
    """Checks docs"""
    flag = True
    with open(file_path, "rb") as f:
        content = f.read()
        # remove shebang
        if content.startswith(b"#!"):
            if len(content.split(b"\n")) < 2:
                content = ""
            else:
                content = content.split(b"\n", 1)[1]
        tree = None
        try:
            tree = ast.parse(content)
        except Exception:
            print_error_parsing_file(file_path)
        try:
            if tree is None:
                return
            for node in ast.walk(tree):
                # check module docstring
                if isinstance(node, ast.Module):
                    if not isinstance(node.body[0].value, ast.Constant):
                        flag = False
                        print("{} does not have Module DocString".
                              format(file_path))
                        return
                # check function docstring
                if isinstance(node, ast.FunctionDef) and not isinstance(
                    node.body[0].value, ast.Constant
                ):
                    flag = False
                    print("In {}, the {} function has no Function DocString".
                          format(file_path, node.name))
                if isinstance(node, ast.ClassDef) and not isinstance(
                    node.body[0].value, ast.Constant
                ):
                    flag = False
                    print("In {}, the {} class has no Class DocString".
                          format(file_path, node.name))
        except Exception:
            print("Error: Check docstrings in {}".format(file_path))
            return False
    return flag


def main():
    """Main function"""
    try:
        for root, dirs, files in os.walk("."):
            for file in files:
                file_path = os.path.join(root, file)
                if file_path.endswith(".py"):
                    check_module_function_class_documentation(file_path)
    except Exception as e:
        print("An error occurred: {}".format(e))


if __name__ == "__main__":
    main()
