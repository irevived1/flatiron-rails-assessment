class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.string :name
      t.string :content
      t.belongs_to :subject, foreign_key: true
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
