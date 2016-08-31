class NotesController < ApplicationController

  before_action :find_note, only: [:show, :edit, :delete]

  def new
    @note = Note.new
    @note.build_subject
  end

  def show
  end

  def edit
  end

  def delete
  end

  def find_note
    @note = Note.find_by(id:params[:id])
    unless @note 
      redirect_to home_index_path
    end
  end
end
