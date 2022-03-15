const code_1 = `def is_question(text):
    if "?" in text:
        return True
    else:
        return False`;

const code_2 = `def format_value(self, value):
    if type(value) in (list, tuple):
        return [self.format_value(x) for x in value]
    if isinstance(value, Model):
        return value.pk
    if value == "" or value is None:
        return None
    return value`;

const code_3 = `def gcd(a: int, b: int) -> int:
    while a != 0:
        a, b = b % a, a
    return b`;

const code_4 = `if __name__ == "__main__":
    import doctest

    doctest.testmod()
    print(f"{convert_to_2d(1.0, 2.0, 3.0, 10.0, 10.0) = }")
    print(f"{rotate(1.0, 2.0, 3.0, 'y', 90.0) = }")`;


const python_codes = [code_1, code_2, code_3, code_4];


export default python_codes;