class Api::V1::CharactersController < ApplicationController


  def index
    @characters = Character.all
    render(json:@characters, status: :ok)
  end

  def show
    find_character
    render(json: @character, status: :ok)
  end

  # def new®
  #
  # end

  def create
    @character = Character.create(character_params)
    render(json: @character, status: :ok)
  end

  # def edit
  #
  # end

  def update

  end

  def destroy

  end

  private

  def find_character
    @character = Character.find_by(id: params[:id])
  end

  def character_params
    params.require(:character).permit(:name, :sprite_img, :health)
  end
end
