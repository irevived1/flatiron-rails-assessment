class Subject < ApplicationRecord
  has_many :notes
  validates :name, presence: true
  scope :most_popular_subject, -> {Subject.joins(:notes).group("subjects.name").order("COUNT(subjects.name) DESC").limit(1) }
  scope :least_popular_subject, -> { Subject.joins(:notes).group("subjects.name").order("COUNT(subjects.name)").limit(1) }
end
