module SubjectsHelper
  def cap_sub(sub)
    sub.name.capitalize if sub
  end
end
