module NotesHelper
  def subject_name(note)
    note.subject.name.capitalize if note.subject
  end
end
