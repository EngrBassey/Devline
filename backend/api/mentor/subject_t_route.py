from flask import request, jsonify, make_response
from backend.models.subjects import Subject
from backend.api.mentor import subject_api_blueprint
from backend import db

@subject_api_blueprint.route('/add_subjects', methods=['POST'])
def add_multiple_subjects():
    # Extract subject data from the request
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    subject_names = data.get('subjects')
    if not subject_names:
        return jsonify({'error': 'Subject names must be provided as a list'}), 400

    existing_subjects = []
    added_subjects = []

    try:
        for subject_name in subject_names:
            if not subject_name.strip():
                continue  # Skip empty subject names

            # Check if the subject already exists in the database
            if Subject.query.filter_by(name=subject_name).first():
                existing_subjects.append(subject_name)
            else:
                # Add the subject to the database if it doesn't exist
                subject = Subject(name=subject_name)
                db.session.add(subject)
                added_subjects.append(subject_name)

        # Commit changes to the database
        db.session.commit()

        response_data = {
            'message': 'Subjects added successfully',
            'added_subjects': added_subjects
        }
        if existing_subjects:
            response_data['existing_subjects'] = existing_subjects

        return jsonify(response_data), 201
    except Exception as e:
        # Rollback changes in case of error
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@subject_api_blueprint.route('/add_subject', methods=['POST'])
def add_subject():
    # Extract subject data from the request
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    subject_name = data.get('subject')
    if not subject_name:
        return jsonify({'error': 'Subject name must be provided'}), 400

    if not subject_name.strip():  # Check if subject name is empty after stripping whitespace
        return jsonify({'error': 'Subject name cannot be empty'}), 400

    if Subject.query.filter_by(name=subject_name).first():
        return jsonify({"error": "Subject already exists in the database"}), 409
    try:
        # Add the subject to the database
        subject = Subject(name=subject_name)
        db.session.add(subject)
        db.session.commit()

        return jsonify({'message': f'Subject "{subject_name}" added successfully'}), 201
    except Exception as e:
        # Rollback changes in case of error
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@subject_api_blueprint.route('/update_subject/<int:id>', methods=['PUT'])
def update_subject(id):
    # Extract subject data from the request
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    subject_name = data.get('subject')
    if not subject_name:
        return jsonify({'error': 'Subject name must be provided'}), 400

    try:
        # Retrieve the subject from the database
        subject = Subject.query.get(id)
        if not subject:
            return jsonify({'error': 'Subject not found'}), 404

        # Update the subject name
        subject.name = subject_name
        db.session.commit()

        return jsonify({'message': f'Subject with ID {id} updated successfully'}), 200
    except Exception as e:
        # Rollback changes in case of error
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@subject_api_blueprint.route('/all_subjects', methods=['GET'])
def get_all_subjects():
    try:
        # Query all subjects from the database
        subjects = Subject.query.all()

        # Format the response data with subject names and IDs
        subjects_data = [{'id': subject.id, 'name': subject.name} for subject in subjects]

        return jsonify(subjects_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@subject_api_blueprint.route('/delete', methods=['DELETE'])
def delete_subject(id):
    try:
        # Retrieve the subject from the database
        subject = Subject.query.get(id)
        if not subject:
            return jsonify({'error': 'Subject not found'}), 404

        # Delete the subject from the database
        db.session.delete(subject)
        db.session.commit()

        return jsonify({'message': f'Subject with ID {id} deleted successfully'}), 200
    except Exception as e:
        # Rollback changes in case of error
        db.session.rollback()
        return jsonify({'error': str(e)}), 500