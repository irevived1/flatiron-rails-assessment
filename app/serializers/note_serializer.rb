class NoteSerializer < ActiveModel::Serializer
  attributes :id, :name, :content
  has_one :subject, serializer: NoteSubjectSerializer
end
