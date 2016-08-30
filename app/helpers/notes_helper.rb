module NotesHelper
  def subject_name(note)
    note.subject.name.capitalize
  end
end
