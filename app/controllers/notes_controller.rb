class NotesController < ApplicationController
  before_action :find_note, only: [:show]

  def show
    @note = Note.find_by(id:params[:id])
    @subject = @note.subject.id
  end

  def find_note
    @note = Note.find_by(id:params[:id])
    unless @note 
      redirect_to home_index_path
    end
  end
end
