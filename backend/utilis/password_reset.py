import secrets
from flask_mail import Mail, Message
from flask import request, jsonify
from itsdangerous import TimedSerializer


from backend.models.student import Student

def send_password_reset_message(student,reset_link):
    message_subject = "Password Reset Request"
    message_body = """Hello {},\n\n
    You have requested to reset your password.
    Please click the following link to reset your password:\n\n{}\n\n
    If you did not request this, please ignore this email.\n\n
    Best regards,\nDevLine
    """.format(student.username, reset_link)

    try:
        msg = Message(message_subject, recipients=[student.email], body=message_body)
        Mail.send(msg)
    except Exception as e:
        return jsonify({'success': False, 'message': 'Failed to send password reset email {}'.format(e)}), 500

    return jsonify({'success': True, 'message': 'Password reset message sent successfully'})


def generate_reset_token(serializer, student_id):
    """Generates password reset token"""
    return serializer.dumps({'user_id': student_id}).encode('utf-8')