class Note < ApplicationRecord
  belongs_to :subject
  belongs_to :user

  accepts_nested_attributes_for :subject
end
