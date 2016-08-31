class Note < ApplicationRecord
  belongs_to :subject
  belongs_to :user

  validates :name, presence: true
  validates :content, presence: true

  def subject_attributes=(sub)
    sub[:name] = sub[:name].downcase if sub[:name]
    self.subject = Subject.find_or_create_by(sub)
  end
end
