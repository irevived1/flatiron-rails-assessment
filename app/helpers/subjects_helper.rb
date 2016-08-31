module SubjectsHelper
  def list_note(sub)
    Note.where("user_id == #{current_user.id} AND subject_id == #{sub.id}")
  end
  def cap_sub(sub)
    sub.name.capitalize
  end
end
